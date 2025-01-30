import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation skeleton */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Skeleton className="h-8 w-[200px]" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-[200px] hidden md:block" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>
        <div className="md:hidden container mx-auto px-4 py-2">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Categories skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-[100px]" />
          ))}
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="aspect-square" />
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-6 w-[200px]" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4">
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-10 w-[150px]" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

