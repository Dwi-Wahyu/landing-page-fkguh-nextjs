// components/sections/OtherBeritaList.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card"; // Sesuaikan path Shadcn UI
import { useInView } from "@/components/ui/use-in-view"; // Sesuaikan path useInView

// Definisikan tipe untuk post berita lainnya
// Sesuaikan dengan data yang Anda dapatkan dari queryCollection("berita").all()
interface OtherBeritaPost {
  path: string;
  title: string;
  description?: string; // Asumsi ini adalah deskripsi_singkat
  author?: string;
  date?: string;
  image?: string; // Path gambar
}

interface OtherBeritaListProps {
  otherPosts: OtherBeritaPost[];
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    console.error("Failed to parse date for other post:", dateString, e);
    return dateString;
  }
};

export const OtherBeritaList: React.FC<OtherBeritaListProps> = ({
  otherPosts,
}) => {
  const { ref: gridRef, inView: isGridInView } = useInView<HTMLDivElement>({
    threshold: 0.1, // Animasi dimulai saat 10% dari grid terlihat
    triggerOnce: true, // Hanya animasikan sekali
  });

  return (
    <div className="mt-10 px-4 mb-10 sm:px-8 md:px-20">
      <h2 className="text-xl font-bold mb-6">Berita Lainnya</h2>
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {otherPosts.map((post, idx) => (
          <Card
            key={post.path} // Menggunakan post.path sebagai key yang unik
            className={`overflow-hidden transition-all duration-700 ease-out ${
              isGridInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ animationDelay: isGridInView ? `${idx * 150}ms` : "0ms" }}
          >
            <Link href={post.path} className="block">
              <CardContent>
                <Image
                  src={post.image || "/berita/not-found-berita-img.png"}
                  alt={post.title || "Gambar Berita Lainnya"}
                  width={320} // Sesuaikan ukuran gambar
                  height={176} // (h-44 = 176px)
                  className="w-full h-44 object-cover mb-4 rounded-lg"
                />
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {post.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {post.author && <span>Oleh {post.author}</span>}
                  {post.author && post.date && <span> | </span>}
                  {post.date && <span>{formatDate(post.date)}</span>}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};
