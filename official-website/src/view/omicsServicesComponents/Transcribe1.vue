<template>
    <div id="Transcribe1">
         <div class="btn-group btn-group-justified" role="group" aria-label="...">
           <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">{{ item.name }}</div>
         </div>
    </div>
</template>
<script>
export default {
    name: 'Transcribe1',
    data() {
        return {
            rightIndex:0,
            btnList: [
                {
                    name: '产品介绍',

                }, {
                    name: '技术路线',

                }, {
                    name: '样本要求',

                }, {
                    name: '分析内容及结果',

                }
            ]
        }
    },
    methods: {
        changeIndex(index) {
            this.rightIndex = index
        }
    }

}
</script>
<style scoped>

.btnActive {
    background-color: #999999;
}

.btnUnactive {
    background-color: #FFFFFF;
}
</style>

