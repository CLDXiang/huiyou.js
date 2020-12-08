import { VideoInfo } from './video';

/** “点赞” 请求的请求体 */
export interface LikeRequestBody {
  formData: {
    /** AV 号 */
    aid: [string];
    csrf: [string];
    /** '1' 表示点赞，'2' 表示取消点赞 */
    like: ['1' | '2'];
  };
}

/** “收藏” 请求的请求体 */
export interface FavoriteRequestBody {
  formData: {
    /** 非空表示添加收藏 */
    add_media_ids: string[];
    csrf: string[];
    /** 非空表示取消收藏 */
    del_media_ids: string[];
    jsonp: string[];
    /** 视频的 AV 号 */
    rid: [string];
    type: string[];
  };
}

/** 视频接口的响应体 */
export interface FetchVideoResponseBody {
  /** 总页数，请求失败时为 0 */
  numPages: number;
  /** 总结果数，请求失败时为 0 */
  numResults: number;
  /** 请求的页数 */
  page: number;
  /** 每页视频数 */
  pagesize: number;
  /** 视频信息 */
  result: VideoInfo[] | null;
}

/** 获取 B 站视频信息的请求参数 */
export type GetVideoInfoParams = Partial<{
  /** 视频 AV 号 */
  aid: string;
  /** 视频 BV 号 */
  bvid: string;
}>;

/** 获取 B 站视频预览的请求参数 */
export type GetVideoShotParams = Partial<{
  /** av 号 */
  aid: number;
  /** bv 号 */
  bvid: string;
  /** 分 P CID，默认 1 */
  cid: number;
  /** json 数组截取时间表
   * 1: 需要
   * 2: 不需要（默认）
   */
  index: number;
}>;

/** 获取 B 站视频信息的返回体 */
export interface GetVideoInfoResponseBody {
  /** 数据体 */
  data: {
    /** 视频 BV 号 */
    bvid: string;
    /** 视频 AV 号 */
    aid: number;
    /** 视频分 P 总数 */
    videos: number;
    /** 分区 ID */
    tid: number;
    /** 子分区名称 */
    tname: string;
    /** 是否转载
     * 1: 原创
     * 2: 转载
     */
    copyright: number;
    /** 视频封面图片 URL */
    pic: string;
    /** 稿件标题 */
    title: string;
    /** 稿件发布时间 */
    pubdate: number;
    /** 用户提交稿件的时间 */
    ctime: number;
    /** 视频简介 */
    desc: string;
    /** 视频状态
     * 0：开放浏览
     * 1：橙色通过
     * -1：待审
     * -2：被打回
     * -3：网警锁定
     * -4：被锁定
     * -5：管理员锁定（可浏览）
     * -6：修复待审
     * -7：暂缓审核
     * -8：补档待审
     * -9：等待转码
     * -10：延迟审核
     * -11：视频源待修
     * -12：转储失败
     * -13：允许评论待审
     * -14：临时回收站
     * -15：分发中
     * -16：转码失败
     * -20：创建未提交
     * -30：创建已提交
     * -40：定时发布
     * -100：用户删除
     */
    state: number;
    /** 稿件总时长（所有分 P，单位秒） */
    duration: number;
    /** 视频 UP 主信息 */
    owner: {
      /** UP 主 uid */
      mid: number;
      /** UP 主昵称 */
      name: string;
      /** UP 主头像 URL */
      face: string;
    };
    /** 视频状态数 */
    stat: {
      /** 稿件 AV 号 */
      aid: number;
      /** 播放数 */
      view: number;
      /** 弹幕数 */
      danmaku: number;
      /** 评论数 */
      reply: number;
      /** 收藏数 */
      favorite: number;
      /** 硬币数 */
      coin: number;
      /** 分享数 */
      share: number;
      /** 当前排名 */
      now_rank: number;
      /** 历史最高排名 */
      his_rank: number;
      /** 获赞数 */
      like: number;
      /** 点踩数（恒为 0） */
      dislike: number;
      /** 视频评分 */
      evaluation: string;
    };
    /** 视频同步发布的的动态的文字内容 */
    dynamic?: string;
    /** 视频 1P CID */
    cid: number;
    /** 视频 1P 分辨率 */
    dimension: {
      width: number;
      height: number;
      rotate: number;
    };
    /** 视频分 P 列表 */
    pages: {
      /** 当前分 P CID */
      cid: number;
      /** 当前分 P */
      page: number;
      /** 视频来源
       * vupload: 普通上传（B站）
       * hunan: 芒果TV
       * qq: 腾讯
       */
      from: string;
      /** 当前分 P 标题 */
      part: string;
      /** 当前分 P 持续时间（秒） */
      duration: number;
      /** 站外视频 vid */
      vid: string;
      /** 站外视频跳转 URL */
      weblink: string;
      /** 当前分 P 分辨率 */
      dimension?: {
        width: number;
        height: number;
        rotate: number;
      };
    }[];
    /** 合作成员列表 */
    staff?: {
      /** 成员 UID */
      mid: number;
      /** 成员名称 */
      title: string;
      /** 成员昵称 */
      name: string;
      /** 成员头像 URL */
      face: string;
      /** 成员大会员状态 */
      vip: {
        /** 成员会员信息
         * 0: 无
         * 1: 月会员
         * 2: 年会员
         */
        type: number;
        /** 会员状态
         * 0: 无
         * 1: 有
         */
        status: number;
      };
      /** 成员认证信息 */
      official: {
        /** 成员认证级别
         * 0: 无
         * 1~2: 个人认证
         * 3~6: 机构认证
         */
        role: number;
        /** 成员认证名 */
        title?: string;
        /** 成员认证备注 */
        desc?: string;
        /** 成员认证类型
         * -1: 无
         * 0: 有
         */
        type: number;
      };
      /** 成员粉丝数 */
      follower: number;
    }[];
  };
}

/** 获取 B 站视频信息的返回体 */
export interface GetVideoShotResponseBody{
  /** 返回值
   * 0: 成功
   * 40001: 请求错误
   * 40003: 无此视频
   */
  code: number;
  /** 错误信息 */
  message: string;
  ttl: number;
  data: {
    pvdata: string;
    img_x_len: number;
    img_y_len: number;
    img_x_size: number;
    img_y_size: number;
    image: string[];
    index: number[];
  };
}
