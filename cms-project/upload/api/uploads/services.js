// 服务层 处理业务逻辑 调用 db/models/....
const multer = require("@koa/multer");
const fs = require("fs");
const Key = require("../../configuration/env")();
const ObsClient = require("esdk-obs-nodejs");
const { promisify } = require("util");
const path = require("path");

const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const images = require("images");
const convert = require("heic-convert");

let obsClient = new ObsClient({
  access_key_id: "YCW3WBETUJBR34N71LQN",
  secret_access_key: "sQX2MHygM7Gcs9LNBXiZF88OCbxDa7DfGie3z4gP",
  server: "https://obs.ap-southeast-3.myhuaweicloud.com",
});

let obsListMap = [
  {
    bucket: "m-ebuy",
    serverAccessUrl: "https://www.ebuysgp.com/uploadComm",
    obsAccessUrl: "https://m-ebuy.obs.ap-southeast-3.myhuaweicloud.com/ebuy",
  },
  {
    bucket: "m-ebuy-delivery",
    serverAccessUrl: "https://www.ebuysgp.com/ebuy-delivery/uploadComm",
    obsAccessUrl:
      "https://m-ebuy-delivery.obs.ap-southeast-3.myhuaweicloud.com/ebuy",
  },
  {
    bucket: "m-ebuy-good",
    serverAccessUrl: "https://www.ebuysgp.com/ebuy-good/uploadComm",
    obsAccessUrl:
      "https://m-ebuy-good.obs.ap-southeast-3.myhuaweicloud.com/ebuy",
  },
  {
    bucket: "m-ebuy-product",
    serverAccessUrl: "https://www.ebuysgp.com/ebuy-product/uploadComm",
    obsAccessUrl:
      "https://m-ebuy-product.obs.ap-southeast-3.myhuaweicloud.com/ebuy",
  },
  {
    bucket: "m-ebuy-canteen",
    serverAccessUrl: "https://www.ebuysgp.com/ebuy-canteen/uploadComm",
    obsAccessUrl:
      "https://m-ebuy-canteen.obs.ap-southeast-3.myhuaweicloud.com/ebuy",
  },
  {
    bucket: "m-ebuy-order",
    serverAccessUrl: "https://www.ebuysgp.com/ebuy-order/uploadComm",
    obsAccessUrl:
      "https://m-ebuy-order.obs.ap-southeast-3.myhuaweicloud.com/ebuy",
  },
  {
    bucket: "m-ebuy-purchase",
    serverAccessUrl: "https://www.ebuysgp.com/ebuy-purchase/uploadComm",
    obsAccessUrl:
      "https://m-ebuy-purchase.obs.ap-southeast-3.myhuaweicloud.com/ebuy",
  },
  {
    bucket: "m-ebuy-consignee",
    serverAccessUrl: "https://www.ebuysgp.com/ebuy-consignee/uploadComm",
    obsAccessUrl:
      "https://m-ebuy-consignee.obs.ap-southeast-3.myhuaweicloud.com/ebuy",
  },
  {
    bucket: "m-ebuymart",
    serverAccessUrl: "//www.ebuysgp.com/ebuymart/uploadComm",
    obsAccessUrl:
      "https://m-ebuymart.obs.ap-southeast-3.myhuaweicloud.com/ebuy",
  },
  {
    bucket: "beatprice",
    serverAccessUrl: "https://www.ebuysgp.com/beatprice/uploadComm",
    obsAccessUrl: "https://beatprice.obs.ap-southeast-3.myhuaweicloud.com/ebuy",
  },
];

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

let storageNoChangName = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let uploadObs = (key, localFile, bucket) => {
  return new Promise(async (resolve, rejects) => {
    try {
      obsClient.putObject(
        {
          Bucket: bucket,
          Key: key,
          SourceFile: localFile, // localfile为待上传的本地文件路径，需要指定到具体的文件名
        },
        (err, result) => {
          if (err) {
            fs.unlinkSync(localFile);
            throw err;
          } else {
            fs.unlinkSync(localFile);
            resolve(result);
          }
        }
      );
    } catch (error) {
      rejects(error);
    }
  });
};

module.exports = {
  uploadsCommNoLimit: async (ctx, next) => {
    let fileFilter = function (req, file, cb) {
      let typeArr = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
      if (typeArr.indexOf(file.mimetype) != -1) {
        cb(null, true); //允许
      } else {
        req.err = "失败";
        cb(null, false);
      }
    };
    let limits = {
      fields: 10, //非文件字段的数量
      fileSize: 100000 * 1024, //文件大小 单位 kb
      files: 1, //文件数量
    };
    let upload = multer({
      storage,
      limits,
    });

    let err = await upload
      .single("uploadComm")(ctx, next)
      .then((res) => res)
      .catch((err) => err);

    if (err) {
      ctx.status = 400;
      return {
        msg: "上传失败请重试",
        err,
      };
    } else {
      const file = ctx.request.file;
      const isNeedCompress = ctx.request.body.isNeedCompress;
      const project = ctx.request.body.project || "Comm";
      const bucket = ctx.request.body.bucket || "m-ebuy";

      let obsCrtMap = obsListMap.find((x) => x.bucket == bucket);
      if (!file) {
        //文件类型不符合未上传
        ctx.status = 400;
        return { msg: "上传文件失败请重试" };
      }

      let localFile = "./static/" + file.filename;

      if (file.mimetype == "image/heic") {
        console.log(file);

        let heicBuffer = await new Promise((resolve, reject) => {
          fs.readFile(
            path.join(__dirname + `../../../static/${file.filename}`),
            async (err, buffer) => {
              if (err) {
                reject(err);
              } else {
                resolve(buffer);
              }
            }
          );
        });

        const outputBuffer = await convert({
          buffer: heicBuffer, // the HEIC file buffer
          format: "JPEG", // output format
          quality: 1, // the jpeg compression quality, between 0 and 1
        });

        let newfileName = file.filename.split(".")[0] + ".jpg";
        await new Promise((resolve, reject) => {
          fs.writeFile(
            path.join(__dirname, `../../static/${newfileName}`),
            outputBuffer,
            (err, buffer) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                resolve(buffer);
              }
            }
          );
        });

        file.filename = newfileName;
        localFile = "./static/" + file.filename;
      }

      if (file.size > 1000 * 1024 && isNeedCompress) {
        //压缩png格式图片 linux中使用imageminPngquant有诸多限制，暂未解决
        if (file.mimetype === "image/png") {
          let files = await imagemin([localFile], {
            destination: "./static",
            plugins: [imageminPngquant({})],
          });
        }
        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
          let files = await images(localFile).save(localFile, {
            quality: 70,
          });
        }
      }

      let key = `${project}/${file.filename}`;
      let res = await uploadObs(key, localFile, obsCrtMap.bucket);
      if (res.CommonMsg.Status == 200) {
        return (res = {
          msg: "文件上传成功",
          data: {
            ...res,
            url: `${obsCrtMap.serverAccessUrl}/${project}/${file.filename}`,
          },
        });
      } else {
        return { msg: "上传文件失败请重试" };
      }
    }
  },
  uploadsNoChangName: async (ctx, next) => {
    let limits = {
      fields: 10, //非文件字段的数量
      fileSize: 100000 * 1024, //文件大小 单位 kb
      files: 1, //文件数量
    };
    let upload = multer({
      storage: storageNoChangName,
      limits,
    });

    let err = await upload
      .single("uploadComm")(ctx, next)
      .then((res) => res)
      .catch((err) => err);

    if (err) {
      ctx.status = 400;
      return {
        msg: "上传失败请重试",
        err,
      };
    } else {
      const file = ctx.request.file;
      const isNeedCompress = ctx.request.body.isNeedCompress;
      const project = ctx.request.body.project || "Comm";
      const bucket = ctx.request.body.bucket || "m-ebuy";
      let obsCrtMap = obsListMap.find((x) => x.bucket == bucket);

      if (!file) {
        //文件类型不符合未上传
        ctx.status = 400;
        return { msg: "上传文件失败请重试" };
      }

      let localFile = "./static/" + file.filename;

      if (file.size > 1000 * 1024 && isNeedCompress) {
        //压缩png格式图片 linux中使用imageminPngquant有诸多限制，暂未解决
        if (file.mimetype === "image/png") {
          let files = await imagemin([localFile], {
            destination: "./static",
            plugins: [imageminPngquant({})],
          });
        }
        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
          let files = await images(localFile).save(localFile, {
            quality: 70,
          });
        }
      }

      let key = `${project}/${file.filename}`;
      let res = await uploadObs(key, localFile, obsCrtMap.bucket);
      if (res.CommonMsg.Status == 200) {
        return (res = {
          msg: "文件上传成功",
          data: {
            ...res,
            url: `${obsCrtMap.serverAccessUrl}/${project}/${file.filename}`,
          },
        });
      } else {
        return { msg: "上传文件失败请重试" };
      }
    }
  },
};
