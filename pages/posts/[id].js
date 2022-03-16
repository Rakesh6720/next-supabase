import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../api";

export default function Post({ post }) {
  const router = useRouter();
  // console log router object to check fallback property
  console.log("pages/posts/[id].js -- router: ", router);
  if (router.isFallback) {
    return <div>(router is in fallback...Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide">
        {post.title}
      </h1>
      <p className="text-sm font-light my-4">By {post.user_email}</p>
      <div className="mt-8">
        <ReactMarkdown className="prose">{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("posts").select("id");
  // create new array where each post becomes an object with params key
  const paths = data.map((post) => ({
    params: { id: JSON.stringify(post.id) },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const { data } = await supabase
    .from("posts")
    .select()
    // what is eq?
    .filter("id", "eq", id)
    .single();
  return {
    props: {
      post: data,
    },
  };
}
