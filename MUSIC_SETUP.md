# 🎵 How to Add Background Music

## Quick Setup

1. **Get Your Music File**
   - Download a cyberpunk/synthwave style background music
   - Recommended sources:
     - [YouTube Audio Library](https://www.youtube.com/audiolibrary)
     - [Free Music Archive](https://freemusicarchive.org/)
     - [Incompetech](https://incompetech.com/)
     - [Pixabay Music](https://pixabay.com/music/)

2. **Convert to MP3 (if needed)**
   - Use online converters or tools like Audacity
   - Recommended settings: 128kbps or 192kbps

3. **Add to Project**
   - Place your music file in `/public/music/`
   - Rename it to `cyberpunk-bg.mp3`
   - Optionally, create an OGG version for better browser support

4. **File Structure**
   ```
   /public
     /music
       cyberpunk-bg.mp3  ← Your music file
       cyberpunk-bg.ogg  ← Optional fallback
   ```

5. **Test It**
   - Refresh your browser
   - Click the 🔇 icon in the header to toggle music

## Recommendations

- **Length**: 2-5 minutes (it will loop automatically)
- **Volume**: Make sure the music isn't too loud (normalize if needed)
- **Style**: Synthwave, Cyberpunk, Electronic, Lo-fi Cyberpunk
- **Size**: Keep under 5MB for faster loading

## Popular Cyberpunk Music Styles

- Synthwave
- Retrowave
- Cyberpunk Ambient
- Futuristic Electronic
- Dark Synthwave

## Important Notes

- ⚠️ **Always check copyright/licensing** before using music
- The music toggle button is in the top-right of the header
- Music is paused by default - users must click to play
- The audio element is configured to loop automatically

## Alternative: Use a URL

If you prefer to host the music elsewhere (like AWS S3, Cloudinary, etc.), 
edit `/src/app/layout.tsx` and change the audio source:

```tsx
<source src="https://your-cdn.com/music.mp3" type="audio/mpeg" />
```

---

**Current Status**: Ready to accept your music file!
Just drop `cyberpunk-bg.mp3` into this folder and refresh.
