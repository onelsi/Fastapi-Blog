'use client';

import React, { useEffect, useState } from "react";

// Define the types for Post and Author
interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
  created_at: string;
}

interface PostDetailsProps {
  postId: string; // The ID of the post to fetch
}

const PostDetails: React.FC<PostDetailsProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/posts/${postId}`);
        const data: Post = await response.json(); // Ensure the response matches the Post type
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]); // Refetch when the postId changes

  if (loading) {
    return <p className="text-gray-500">Loading post details...</p>;
  }

  if (!post) {
    return <p className="text-gray-500">Failed to load post details.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="text-sm text-gray-600 mb-4">
        By: {post.author.name} ({post.author.email})
      </p>
      <p className="text-gray-800">{post.content}</p>
      <p className="text-sm text-gray-500 mt-4">
        Posted on: {new Date(post.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PostDetails;