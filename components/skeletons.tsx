import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CategorySkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl p-4 h-32">
      <Skeleton className="absolute inset-0" />
      <div className="relative h-full flex flex-col items-center justify-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden border-2">
      <div className="p-0">
        <div className="relative aspect-square">
          <Skeleton className="absolute inset-0" />
        </div>
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="flex justify-between items-center p-4 border-t">
        <Skeleton className="h-6 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </Card>
  )
}

export function HeroSkeleton() {
  return (
    <div className="py-20 text-center relative">
      <div className="container mx-auto px-4 space-y-6">
        <div className="space-y-4 mx-auto">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-12 w-1/2 mx-auto" />
        </div>
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>
    </div>
  )
}

export function OfferCardSkeleton() {
  return (
    <Card className="w-[300px] flex-shrink-0">
      <div className="p-4">
        <div className="relative mb-4">
          <div className="relative h-[150px] rounded-lg overflow-hidden mb-4">
            <Skeleton className="absolute inset-0" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function CartItemSkeleton() {
  return (
    <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-8 w-8" />
    </div>
  )
}

export function FooterSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-10" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
