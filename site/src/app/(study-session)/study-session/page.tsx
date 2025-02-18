import { StudySessionClient } from '@/components/study-session-tabs-and-cards/study-session';

export default function StudySession() {
  // This page does not need to be SEO performant and rather should be
  // optimized for PWA, so we make everything a big client component.

  // Here, we might add server side logic to load in the study session.

  return <StudySessionClient />;
}
