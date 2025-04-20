import Image from "next/image";
import Header from "@/components/Header";
import PostsList from "@/components/PostsList";

export default function Home() {
  return (
    <div> 
      <Header />
      <div>
        <PostsList />
      </div>
    </div>

      
  );
}
