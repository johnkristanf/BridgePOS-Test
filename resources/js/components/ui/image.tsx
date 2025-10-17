import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { cn } from "@/lib/cn"

interface ImageComponentProps {
  src: string
  alt: string
  height?: string | number
  width?: string | number
  caption?: string
  className?: string
  wrapperClassName?: string
  imageClassName?: string
  captionClassName?: string
  disableEffect?: boolean
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  objectPosition?: string
  loading?: "lazy" | "eager"
  onLoad?: () => void
  onError?: () => void
  placeholder?: string
  formatParam?: string
}

/**
 * ImageComponent automatically serves a WebP version of the image when supported.
 * It wraps both the standard <img> and LazyLoadImage in a <picture> tag.
 */
const ImageComponent = ({
  src,
  alt,
  height,
  width,
  caption,
  className,
  wrapperClassName,
  imageClassName,
  captionClassName,
  disableEffect = false,
  objectFit = "cover",
  objectPosition = "center",
  loading = "lazy",
  onLoad,
  onError,
  placeholder,
  formatParam = "?format=webp",
}: ImageComponentProps) => {
  const webpSrc = src.includes("?")
    ? `${src}&format=webp`
    : `${src}${formatParam}`

  return (
    <div className={cn("relative", className)}>
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        {disableEffect ? (
          <img
            src={src}
            alt={alt}
            height={height}
            width={width}
            loading={loading}
            onLoad={onLoad}
            onError={onError}
            className={cn(
              "h-full w-full",
              `object-${objectFit}`,
              imageClassName,
            )}
            style={{ objectPosition }}
          />
        ) : (
          <LazyLoadImage
            src={src}
            alt={alt}
            height={height}
            width={width}
            effect="blur"
            wrapperClassName={cn("h-full w-full", wrapperClassName)}
            className={cn(
              "h-full w-full",
              `object-${objectFit}`,
              imageClassName,
            )}
            style={{ objectPosition }}
            loading={loading}
            onLoad={onLoad}
            onError={onError}
            placeholderSrc={placeholder}
          />
        )}
      </picture>

      {caption && (
        <span
          className={cn(
            "mt-2 block text-sm text-muted-foreground",
            captionClassName,
          )}
        >
          {caption}
        </span>
      )}
    </div>
  )
}

export default ImageComponent
