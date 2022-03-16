import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
// what is next/dynamic?
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { supabase } from "../api";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
const initialState = { title: "", content: "" };

function CreatePost() {
  const [post, setPost] = useState(initialState);
  const { title, content } = post;
  const router = useRouter();
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }
  async function createNewPost() {
    // if post has no title or content return
    if (!title || !content) return;
    // grab user from supabath auth client
    const user = supabase.auth.user();
    // generate unique id
    const id = uuid();
    // assign unique id to post
    post.id = id;
    // destructure response from db into data
    const { data } = await supabase
      .from("posts")
      .insert([{ title, content, user_id: user.id, user_email: user.email }])
      .single();
    // console log data
    console.log(data);
    router.push(`/posts/${data.id}`);
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6">
        Create new post
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus: outline-non w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <button
        type="button"
        className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >
        Create Post
      </button>
    </div>
  );
}

export default CreatePost;
