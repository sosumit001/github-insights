declare module 'github-insights-card' {
    import React from 'react';
  
    interface GithubProfileCardProps {
      username: string;
      width: string;
      theme: string;
    }
  
    const GithubProfileCard: React.FC<GithubProfileCardProps>;
  
    export default GithubProfileCard;
  }
  