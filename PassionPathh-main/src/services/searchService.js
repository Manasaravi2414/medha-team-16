import { mockDiscoverTasks } from '../data/mockDiscoverTasks';
import { mockMentors } from '../data/mockMentors';

export const searchAll = (query, interests = []) => {
  const term = query.toLowerCase().trim();
  const normalizedInterests = (interests || []).map(i => i.toLowerCase());

  // Search Paths
  const paths = mockDiscoverTasks.careers.filter(career => {
    if (!term) return true;
    return (
      career.title.toLowerCase().includes(term) ||
      career.desc.toLowerCase().includes(term) ||
      (career.tags && career.tags.some(tag => tag.toLowerCase().includes(term))) ||
      (career.careers && career.careers.some(c => c.toLowerCase().includes(term)))
    );
  });

  // Search Mentors
  const mentors = mockMentors.filter(mentor => {
    if (!term) return true;
    return (
      mentor.name.toLowerCase().includes(term) ||
      mentor.domain.toLowerCase().includes(term) ||
      (mentor.tags && mentor.tags.some(tag => tag.toLowerCase().includes(term)))
    );
  });

  // Prioritization helper
  const prioritize = (items, keySelector) => {
    return items.sort((a, b) => {
      const aVal = keySelector(a).toLowerCase();
      const bVal = keySelector(b).toLowerCase();
      
      const aMatch = normalizedInterests.some(i => aVal.includes(i));
      const bMatch = normalizedInterests.some(i => bVal.includes(i));
      
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  };

  return {
    paths: prioritize(paths, p => p.title + p.category),
    mentors: prioritize(mentors, m => m.name + m.domain)
  };
};
