// components/dashboard/admin/shared/SummaryTiles.tsx
import StatTile, { StatTileProps } from './StatTile';

interface SummaryTilesProps {
  tiles: StatTileProps[];
}

export default function SummaryTiles({ tiles }: SummaryTilesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {tiles.map((tile) => (
        <StatTile key={tile.id} {...tile} />
      ))}
    </div>
  );
}
