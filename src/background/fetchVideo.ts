/**
 * 从 B 站拉取视频
 */
import { VideoInfo } from '@/types/video';
import { FetchVideoResponseBody } from '@/types/webRequest';
import axios from 'axios';

const keyword = 'VLOG';
/** 视频播放量上限 */
const limitOfAmountOfPlay = 10;
/** 视频长度下限/秒 */
const durationLimit = 60;
/** 拉取视频的起始页数 */
const startPage = 400;
/** 拉取视频的结束页数 */
const endPage = 390;

/**
 * 从 VLOG 区爬取视频数据
 * @param page 页数
 */
async function fetchVideo(page: number): Promise<VideoInfo[] | null> {
  const url = `https://s.search.bilibili.com/cate/search?main_ver=v3&search_type=video&view_type=hot_rank&order=click&copy_right=-1&cate_id=21&page=${page}&pagesize=20&keyword=${keyword}`;
  const response = await axios.get<FetchVideoResponseBody>(url);
  if (response.status !== 200) {
    return null;
  }
  const { data } = response;
  return data.result;
}

/**
 * 从视频列表里随机选择一个视频，如果列表为空则返回 `null`
 * @param videos 视频列表
 */
function randomChoose(videos: VideoInfo[]): VideoInfo | null {
  const { length } = videos;
  if (length === 0) {
    return null;
  }

  const idx = Math.floor(Math.random() * length);
  return videos[idx];
}

/**
 * 从视频列表中根据条件筛选视频，如果没有符合条件的视频则返回 `null`
 * @param videos 视频列表
 */
function chooseAVideo(videos: VideoInfo[]): VideoInfo | null {
  const results = videos.filter(
    ({ play, duration }) =>
      Number.parseInt(play, 10) <= limitOfAmountOfPlay && duration >= durationLimit,
  );
  return randomChoose(results);
}

async function getVideoRecursively(page = startPage): Promise<VideoInfo | null> {
  const videos = await fetchVideo(page);
  const chosenVideo = chooseAVideo(videos ?? []);
  // 在当前页找到符合条件的视频
  if (chosenVideo !== null) {
    return chosenVideo;
  }

  // 爬取的最后一页也没有符合条件的视频，随机选择一个
  if (page === endPage) {
    return randomChoose(videos ?? []);
  }

  return getVideoRecursively(page - 1);
}

/**
 * 获取一个视频的信息，成功则返回视频信息，失败返回 `null`
 */
export default async function getVideo(): Promise<VideoInfo | null> {
  return getVideoRecursively(startPage);
}
