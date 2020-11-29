/** B 站视频请求返回类型 */
export interface VideoInfo {
  arcrank: string;
  arcurl: string;
  author: string;
  badgepay: boolean;
  /** BV 号 */
  bvid: string;
  description: string;
  /** 时长/秒 */
  duration: number;
  /** 收藏数 */
  favorites: number;
  id: number;
  is_pay: number;
  is_union_video: number;
  mid: number;
  /** 预览图 */
  pic: string;
  /** 播放量 */
  play: string;
  pubdate: string;
  rank_offset: number;
  rank_index: number;
  rank_score: number;
  review: number;
  senddate: number;
  tag: string;
  title: string;
  type: string;
  video_review: number;
}

export interface PlayVideoInfo {
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
}

export interface VideoShot {
  pvdata?: string;
  imgXLen?: number;
  imgYLen?: number;
  imgXSize?: number;
  imgYSize?: number;
  image?: string[];
  index: number[];
}
