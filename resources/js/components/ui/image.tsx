import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { cn } from "@/lib/cn"

interface ImageComponentProps {
  src: string
  alt: string
  height?: string
  width?: string
  caption?: string
  className?: string
  disableEffect?: boolean
}

const ImageComponent = ({
  src,
  alt,
  height,
  width,
  caption,
  className,
  disableEffect = false,
}: ImageComponentProps) => (
  <div className={cn("relative", className)}>
    <LazyLoadImage
      src={src}
      alt={alt}
      height={height}
      width={width}
      effect={disableEffect ? undefined : "blur"}
      wrapperClassName="w-full h-full"
      className="w-full h-full object-cover object-center"
    />
    {caption && <span className="mt-2 block text-sm">{caption}</span>}
  </div>
)

export default ImageComponent
