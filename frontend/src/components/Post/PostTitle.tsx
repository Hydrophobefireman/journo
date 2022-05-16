import {Post} from "@/api-types/post";
import {postTitleCache, setPostTitleCache} from "@/caching/decryption-cache";
import {useEffect, useState} from "@hydrophobefireman/ui-lib";

export function PostTitle({post}: {post: Post}) {
  const postTitle = usePostTitle(post);
  return (
    <>
      {postTitle} {postTitle != null && !postTitle && " (untitled)"}
    </>
  );
}

export function usePostTitle({_secure_: {meta_data}, id_}: Post) {
  const [postTitle, setTitle] = useState(null);
  useEffect(async () => {
    let maybeTitle = postTitleCache.get(id_);
    if (maybeTitle) {
      return setTitle(maybeTitle);
    }
    const parsed = JSON.parse(meta_data).title;
    setTitle(await setPostTitleCache(id_, parsed));
  }, [meta_data, id_]);
  return postTitle;
}
