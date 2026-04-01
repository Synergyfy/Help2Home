'use client';

import Link from 'next/link';
import { SummaryTileData } from '@/lib/mockLandlordData';

export default function SummaryTiles({ tiles }: { tiles: SummaryTileData[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {tiles.map((tile) => (
                <Link
                    key={tile.id}
                    href={tile.link}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group"
                >
                    {tile.status === 'critical' && (
                        <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                    {tile.status === 'warning' && (
                        <span className="absolute top-3 right-3 w-2 h-2 bg-amber-500 rounded-full"></span>
                    )}

                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <p className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-brand-green transition-colors">
                                {tile.value}
                            </p>
                            <p className="text-sm font-medium text-gray-700">{tile.label}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">{tile.subtitle}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
