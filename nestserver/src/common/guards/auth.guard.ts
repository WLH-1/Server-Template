import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}


// import 语句引入了一些 Nest.js 框架所需的模块和类，
// 包括 ExecutionContext、Injectable 和 Reflector。它们分别用于执行上下文、依赖注入和反射。

// JwtAuthGuard 类被声明为一个 Injectable，
// 这意味着它可以通过 Nest.js 的依赖注入系统来管理，并且可以在其他地方被注入和使用。

// JwtAuthGuard 类扩展了 AuthGuard 类，并将 'jwt' 作为参数传递给 AuthGuard 的构造函数。
// 这意味着 JwtAuthGuard 是一个基于 Passport.js 的 JWT 策略的守卫，用于验证 JWT 的有效性。

// 构造函数中注入了 Reflector 实例，这是 Nest.js 提供的一个反射工具，用于检查元数据。

// canActivate 方法是 AuthGuard 类中的一个方法，它被覆盖以实现自定义的认证逻辑。
// 在这个方法中，首先通过 this.reflector.getAllAndOverride 方法获取了一个名为 'isPublic' 的元数据，该元数据用于标记某些路由或者处理器是否是公开的，即无需认证即可访问。

// 如果获取到了 'isPublic' 元数据，并且其值为 true，则说明该路由或者处理器是公开的，直接返回 true，即允许访问。

// 如果没有获取到 'isPublic' 元数据，或者其值不为 true，则调用 super.canActivate(context) 
// 来委托父类 AuthGuard 的 canActivate 方法来处理认证逻辑。这意味着如果路由没有被标记为公开，则会执行基于 JWT 的认证逻辑。