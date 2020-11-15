/**
 * 从 B 站拉取视频
 */
import { FETCH_VIDEO } from '@/config';
import { FetchVideoResponseBody } from '@/types/bilibiliApiRequest';
import { FetchVideoMessageResponse } from '@/types/message';
import { VideoInfo } from '@/types/video';
import axios from 'axios';
import { getNextVideoFromBackend } from './api';
import { getRecommendedHistory } from './storeRecommendedVideos';

const {
  AMOUNT_OF_PLAY_UPPER_LIMIT,
  END_PAGE,
  KEYWORD,
  START_PAGE,
  VIDEO_DURATION_LOWER_LIMIT,
} = FETCH_VIDEO;

function shouldGetVideoFromBackend(): boolean {
  return Math.random() < 0.5;
}

/**
 * 从 VLOG 区爬取视频数据
 * @param page 页数
 */
async function fetchVideo(page: number): Promise<VideoInfo[] | null> {
  const url = `https://s.search.bilibili.com/cate/search?main_ver=v3&search_type=video&view_type=hot_rank&order=click&copy_right=-1&cate_id=21&page=${page}&pagesize=20&keyword=${KEYWORD}`;
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
  const video = videos[idx];
  return video;
}

/**
 * 从视频列表中根据条件筛选视频，如果没有符合条件的视频则返回 `null`
 * @param videos 视频列表
 */
function chooseAVideo(history: Set<string>, videos: VideoInfo[]): VideoInfo | null {
  const results = videos.filter(
    ({ bvid, play, duration }) =>
      Number.parseInt(play, 10) <= AMOUNT_OF_PLAY_UPPER_LIMIT
      && duration >= VIDEO_DURATION_LOWER_LIMIT
      && !history.has(bvid),
  );
  return randomChoose(results);
}

async function getVideoRecursively(
  history: Set<string>,
  page = START_PAGE,
): Promise<VideoInfo | null> {
  const videos = await fetchVideo(page);
  const chosenVideo = chooseAVideo(history, videos ?? []);
  // 在当前页找到符合条件的视频
  if (chosenVideo !== null) {
    return chosenVideo;
  }

  // 爬取的最后一页也没有符合条件的视频，随机选择一个
  if (page === END_PAGE) {
    return randomChoose(videos ?? []);
  }

  return getVideoRecursively(history, page - 1);
}

/**
 * 获取一个视频的信息，成功则返回视频信息，失败返回 `null`
 */
export default async function getVideo(uid: string): Promise<FetchVideoMessageResponse | null> {
  if (shouldGetVideoFromBackend()) {
    const video = await getNextVideoFromBackend(uid);
    if (video !== null) return video;
  }

  const history = await getRecommendedHistory();
  const video = await getVideoRecursively(history, START_PAGE);
  if (video === null) {
    return null;
  }
  return { bvid: video.bvid };
}
