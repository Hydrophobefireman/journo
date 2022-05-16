import {useSharedState} from "statedrive";

import {Post} from "@/api-types/post";
import {postMetadataStore} from "@/store/posts";
import {useMemo} from "@hydrophobefireman/ui-lib";

export function usePostMetadataById() {
  const [posts] = useSharedState(postMetadataStore);
  const byId = useMemo(() => getPostsMetaDataById(posts), [posts]);
  return byId;
}

export function getPostsMetaDataById(posts: {posts: Post[]}) {
  if (!posts) return {};
  const obj: Record<string, Post> = {};
  posts.posts.forEach((post) => (obj[post.id_] = post));
  return obj || {};
}
