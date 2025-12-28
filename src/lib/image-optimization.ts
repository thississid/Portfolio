/**
 * Image Optimization Utilities
 * Provides functions for image optimization including blur placeholder generation
 */

export interface OptimizedImage {
  src: string;
  blurDataURL: string;
  width: number;
  height: number;
}

/**
 * Generate blur placeholder for an image
 * @param imagePath - Path to the image (can be local or remote URL)
 * @returns Optimized image data with blur placeholder
 */
export async function getOptimizedImage(
  imagePath: string
): Promise<OptimizedImage> {
  try {
    // Note: Install 'plaiceholder' package for automatic blur generation
    // npm install plaiceholder sharp
    // const { getPlaiceholder } = await import('plaiceholder');
    // const { base64, metadata } = await getPlaiceholder(imagePath);
    // return { src: imagePath, blurDataURL: base64, width: metadata.width, height: metadata.height };

    // Fallback: Return image without blur (use Next.js default blur)
    return {
      src: imagePath,
      blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      width: 1200,
      height: 630,
    };
  } catch (error) {
    console.error('Error generating blur placeholder:', error);
    
    // Return fallback values if image optimization fails
    return {
      src: imagePath,
      blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      width: 1200,
      height: 630,
    };
  }
}

/**
 * Generate multiple optimized images
 * Useful for processing all images in a gallery or blog post
 */
export async function getOptimizedImages(
  imagePaths: string[]
): Promise<OptimizedImage[]> {
  return Promise.all(imagePaths.map(getOptimizedImage));
}

/**
 * Convert image URL to WebP format
 * For use with image CDNs that support format conversion
 */
export function getWebPUrl(imageUrl: string, cdnProvider?: 'cloudinary' | 'imgix'): string {
  if (!cdnProvider) {
    // Return original URL if no CDN provider specified
    return imageUrl;
  }

  if (cdnProvider === 'cloudinary') {
    // Example: https://res.cloudinary.com/demo/image/upload/sample.jpg
    // becomes: https://res.cloudinary.com/demo/image/upload/f_webp/sample.jpg
    return imageUrl.replace('/upload/', '/upload/f_webp/');
  }

  if (cdnProvider === 'imgix') {
    // Add fm=webp query parameter
    const url = new URL(imageUrl);
    url.searchParams.set('fm', 'webp');
    return url.toString();
  }

  return imageUrl;
}

/**
 * Get responsive image srcset for different screen sizes
 */
export function getResponsiveSrcSet(
  baseUrl: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
): string {
  return widths
    .map((width) => {
      const url = new URL(baseUrl);
      url.searchParams.set('w', width.toString());
      return `${url.toString()} ${width}w`;
    })
    .join(', ');
}
