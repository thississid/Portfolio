import { render, screen } from '@testing-library/react';
import ShareButtons from '@/components/ui/ShareButtons';

describe('ShareButtons', () => {
  it('renders share buttons', () => {
    render(
      <ShareButtons 
        url="/blog/test-post" 
        title="Test Post" 
        description="Test description"
      />
    );
    
    expect(screen.getByText('Share:')).toBeInTheDocument();
    expect(screen.getByLabelText('Share on Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Share on LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Copy link')).toBeInTheDocument();
  });
});
