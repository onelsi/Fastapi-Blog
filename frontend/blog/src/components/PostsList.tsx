'use client';

import React, { useEffect, useState } from "react";
import PostDetails from "./PostDetails"; // Import the PostDetails component
import CreatePost from "./CreatePost"; // Import the CreatePost component

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

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null); // State for the selected post ID
  const [editingPost, setEditingPost] = useState<Post | null>(null); // State for the post being edited
  const [creatingPost, setCreatingPost] = useState<boolean>(false); // State for creating a new post

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/posts");
        const data: Post[] = await response.json(); // Ensure the response matches the Post type
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await fetch(`http://127.0.0.1:8000/posts/${postId}`, {
        method: "DELETE",
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)); // Remove the deleted post from the list
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (postId: string) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (postToEdit) {
      setEditingPost(postToEdit); // Set the post to be edited
    }
  };

  const handleSave = async () => {
    if (editingPost) {
      try {
        await fetch(`http://127.0.0.1:8000/posts/${editingPost.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingPost),
        });
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editingPost.id ? editingPost : post
          )
        ); // Update the post in the list
        setEditingPost(null); // Exit edit mode
      } catch (error) {
        console.error("Error saving post:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingPost(null); // Exit edit mode without saving
  };

  const handleCreatePost = () => {
    setCreatingPost(true); // Show the CreatePost component
    setSelectedPostId(null); // Deselect any selected post
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post to the list
    setCreatingPost(false); // Exit create mode
  };

  const handleCancelCreate = () => {
    setCreatingPost(false); // Exit create mode
  };

  return (
    <div className="flex h-screen">
      {/* Left side: Posts list */}
      <div className="flex flex-col border border-gray-300 p-4 bg-gray-100 w-1/3 h-screen overflow-y-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="mb-4 p-3 border border-gray-200 rounded bg-white cursor-pointer hover:bg-gray-200 relative"
          >
            <div onClick={() => setSelectedPostId(post.id)}>
              <h3 className="text-lg font-bold mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600">By: {post.author.name}</p>
            </div>
            {/* Action buttons */}
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleEdit(post.id)}
                className="text-blue-500 hover:text-blue-700"
                title="Edit Post"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete Post"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right side: Post details, edit form, or create form */}
      <div className="flex-1 p-5 border-l border-gray-300">
        {creatingPost ? (
          <CreatePost onPostCreated={handlePostCreated} onCancel={handleCancelCreate} />
        ) : editingPost ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={editingPost.content}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows={5}
                ></textarea>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : selectedPostId ? (
          <>
            <PostDetails postId={selectedPostId} />
            <button
              onClick={handleCreatePost}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create New Post
            </button>
          </>
        ) : (
          <div>
            <p className="text-gray-500">Select a post to view its details.</p>
            <button
              onClick={handleCreatePost}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create New Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;