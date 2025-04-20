'use client';

import React, { useEffect, useState } from "react";

interface Author {
  id: string;
  name: string;
  email: string;
}

interface CreatePostProps {
  onPostCreated: (newPost: { id: string; title: string; content: string; author: Author; created_at: string }) => void;
  onCancel: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/authors");
        const data: Author[] = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleSave = async () => {
    if (!selectedAuthorId) {
      alert("Please select an author.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author_id: selectedAuthorId }),
      });
      const newPost = await response.json();
      onPostCreated(newPost); // Notify parent component of the new post
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows={5}
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <select
            id="author"
            value={selectedAuthorId || ""}
            onChange={(e) => setSelectedAuthorId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="" disabled>
              Select an author
            </option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name} ({author.email})
              </option>
            ))}
          </select>
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
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;