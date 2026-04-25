// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Person Page
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { IMG_SIZES } from '../constants';
import { BackIcon, CalendarIcon, MemorialIcon, LocationIcon } from '../components/ui/Icons';
import MediaCard from '../components/ui/MediaCard';
import EmptyState from '../components/ui/EmptyState';

export default function PersonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFullBio, setShowFullBio] = useState(false);

  // Fetch person details + combined credits in one call
  const { data, loading, error } = useApi(
    `/person/${id}`,
    { append_to_response: 'combined_credits' },
    [id]
  );

  // Top known-for works sorted by popularity
  const knownFor = useMemo(() => {
    if (!data?.combined_credits?.cast) return [];
    return [...data.combined_credits.cast]
      .filter((item) => item.poster_path)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 12)
      .map((item) => ({
        ...item,
        media_type: item.media_type || (item.title ? 'movie' : 'tv'),
      }));
  }, [data]);

  // Crew credits (director, producer, etc.) — top 6
  const crewCredits = useMemo(() => {
    if (!data?.combined_credits?.crew) return [];
    return [...data.combined_credits.crew]
      .filter((item) => item.poster_path)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 6)
      .map((item) => ({
        ...item,
        media_type: item.media_type || (item.title ? 'movie' : 'tv'),
      }));
  }, [data]);

  const profileImg = data?.profile_path
    ? `${IMG_SIZES.poster.large}${data.profile_path}`
    : null;
  useDocumentTitle(data?.name ? `${data.name} — Streamora` : 'Streamora');

  const age = useMemo(() => {
    if (!data?.birthday) return null;
    const birth = new Date(data.birthday);
    const end = data.deathday ? new Date(data.deathday) : new Date();
    return Math.floor((end - birth) / (365.25 * 24 * 60 * 60 * 1000));
  }, [data]);

  if (error) {
    return (
      <div className="page page-enter">
        <div className="container">
          <EmptyState
            icon="⚠️"
            title="Could not load person"
            subtitle={error}
            actionLabel="Go Back"
            onAction={() => navigate(-1)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page page-enter">
      {/* Hero section with backdrop */}
      <div className="person-hero">
        <div className="person-hero-overlay" />
        <div className="person-hero-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <BackIcon /> Back
          </button>

          <div className="person-profile-grid">
            {/* Photo */}
            <div className="person-profile-photo">
              {loading ? (
                <div className="skeleton-inner" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-lg)' }} />
              ) : profileImg ? (
                <img src={profileImg} alt={data?.name} loading="lazy" />
              ) : (
                <div className="person-photo-fallback">
                  <span>{(data?.name || '??').slice(0, 2).toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="person-profile-info">
              {loading ? (
                <>
                  <div className="skeleton-inner" style={{ height: 14, width: '30%', borderRadius: 6, marginBottom: 10 }} />
                  <div className="skeleton-inner" style={{ height: 36, width: '70%', borderRadius: 8, marginBottom: 14 }} />
                  <div className="skeleton-inner" style={{ height: 14, width: '50%', borderRadius: 6, marginBottom: 8 }} />
                  <div className="skeleton-inner" style={{ height: 80, width: '100%', borderRadius: 8 }} />
                </>
              ) : (
                <>
                  {data?.known_for_department && (
                    <div className="person-department">{data.known_for_department}</div>
                  )}

                  <h1 className="person-page-name">{data?.name}</h1>

                  <div className="person-meta-row">
                    {data?.birthday && (
                      <span className="detail-meta-item">
                        <CalendarIcon />
                        {new Date(data.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        {age !== null && ` (${age}${data.deathday ? '' : ' years old'})`}
                      </span>
                    )}
                    {data?.deathday && (
                      <span className="detail-meta-item">
                        <MemorialIcon />
                        {new Date(data.deathday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                    {data?.place_of_birth && (
                      <span className="detail-meta-item"><LocationIcon /> {data.place_of_birth}</span>
                    )}
                  </div>

                  {data?.biography && (
                    <div className="person-bio-wrap">
                      <p className={`person-bio ${showFullBio ? 'expanded' : ''}`}>
                        {data.biography}
                      </p>
                      {data.biography.length > 300 && (
                        <button
                          className="person-bio-toggle"
                          onClick={() => setShowFullBio(!showFullBio)}
                        >
                          {showFullBio ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Known For section */}
      <div className="container">
        {knownFor.length > 0 && (
          <div className="section">
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Known For</h2>
            <div className="scroll-row">
              {knownFor.map((item) => (
                <div key={`${item.media_type}-${item.id}-${item.credit_id}`} className="scroll-card scroll-card-lg">
                  <MediaCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}

        {crewCredits.length > 0 && (
          <div className="section">
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Behind the Camera</h2>
            <div className="scroll-row">
              {crewCredits.map((item) => (
                <div key={`crew-${item.id}-${item.credit_id}`} className="scroll-card scroll-card-lg">
                  <MediaCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && knownFor.length === 0 && crewCredits.length === 0 && (
          <EmptyState
            icon="🎭"
            title="No credits found"
            subtitle="This person doesn't have any known film or TV credits yet"
          />
        )}

        <div style={{ paddingBottom: '3rem' }} />
      </div>
    </div>
  );
}
