'use client';
import React from 'react';
import UploadAlbumModal from '@/components/UploadAlbumModal';

export default function AlbumSellPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Sell Your Album</h1>
      <div className="max-w-xl mx-auto">
        <UploadAlbumModal />
      </div>
    </div>
  );
}
