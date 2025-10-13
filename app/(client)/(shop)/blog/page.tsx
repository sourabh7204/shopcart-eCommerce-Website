import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Blog = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: any;
  blogcategories?: { title?: string }[];
};

const BlogPage = async () => {
  const blogs: Blog[] = await getAllBlogs(6);

  return (
    <div className="py-10">
      <Container>
        <Title>Blog Page</Title>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="rounded-md overflow-hidden group border border-lightColor"
            >
              {/* Blog Image */}
              {blog.mainImage && (
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt={blog.title}
                  width={500}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              {/* Blog Info */}
              <div className="bg-gray-50 p-5">
                {/* Category + Date */}
                <div className="text-xs flex items-center justify-between mb-3">
                  <p className="text-shop_dark_green font-semibold">
                    {blog.blogcategories?.[0]?.title || "Uncategorized"}
                  </p>
                  <p className="flex items-center gap-1 text-lightColor">
                    <Calendar size={14} />
                    {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                  </p>
                </div>

                {/* Title */}
                <Link
                  href={`/blog/${blog.slug.current}`}
                  className="text-base font-bold line-clamp-2 hover:text-shop_dark_green transition-colors"
                >
                  {blog.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
