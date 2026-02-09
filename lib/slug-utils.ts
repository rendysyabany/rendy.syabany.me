/**
 * Generate URL-friendly slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace Indonesian characters
    .replace(/[àáâäãåą]/g, 'a')
    .replace(/[èéêëę]/g, 'e')
    .replace(/[ìíîïį]/g, 'i')
    .replace(/[òóôöõø]/g, 'o')
    .replace(/[ùúûüų]/g, 'u')
    .replace(/[ñń]/g, 'n')
    .replace(/[çć]/g, 'c')
    .replace(/[ß]/g, 'ss')
    .replace(/[ÿý]/g, 'y')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9]/g, '-')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-|-$/g, '')
    // Limit length to 60 characters
    .substring(0, 60)
    // Remove trailing hyphen if cut off mid-word
    .replace(/-$/, '');
}

/**
 * Generate slug from post data
 */
export function generatePostSlug(post: { title?: string; content?: string }): string {
  // Try title first
  if (post.title && post.title.trim()) {
    return generateSlug(post.title);
  }
  
  // Fallback to content (first 50 characters)
  if (post.content && post.content.trim()) {
    const plainText = post.content.replace(/<[^>]*>/g, '').trim();
    const firstWords = plainText.substring(0, 50);
    return generateSlug(firstWords);
  }
  
  // No slug available
  return '';
}

/**
 * Generate post URL with optional slug
 */
export function generatePostUrl(id: string, post?: { title?: string; content?: string }): string {
  return `/writing/${id}`;
}

/**
 * Check if a slug matches the expected slug for a post
 */
export function isValidSlug(post: { title?: string; content?: string }, providedSlug: string): boolean {
  const expectedSlug = generatePostSlug(post);
  return expectedSlug === providedSlug;
}
