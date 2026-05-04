// FoodPlease icons — thin line, white/red contexts
const FPIcons = {
  fork: ({ size = 64, color = '#E63946' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M22 6v22a4 4 0 0 0 4 4h0v26a3 3 0 0 0 6 0V32h0a4 4 0 0 0 4-4V6"
        stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6v14M28 6v14M34 6v14" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  back: ({ size = 20, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M13 4l-6 6 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  search: ({ size = 18, color = '#9A9AA0' }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke={color} strokeWidth="1.6"/>
      <path d="M14 14l4 4" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  eye: ({ size = 18, color = '#9A9AA0', off = false }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke={color} strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="2.5" stroke={color} strokeWidth="1.5"/>
      {off && <path d="M3 3l14 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>}
    </svg>
  ),
  heart: ({ size = 22, color = '#fff', filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill={filled ? '#E63946' : 'none'}>
      <path d="M11 18s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 18 8c0 5.5-7 10-7 10z"
        stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  plus: ({ size = 16, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  minus: ({ size = 14, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  trash: ({ size = 16, color = '#9A9AA0' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 4.5h10M6 4.5V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M5 4.5l.5 8.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1l.5-8.5"
        stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: ({ size = 12, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6l2.5 2.5L9.5 3.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // bottom nav
  navMenu: ({ size = 24, color = '#9A9AA0' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 7h14M5 12h14M5 17h9" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  navOrders: ({ size = 24, color = '#9A9AA0' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 4h12l-1 16H7L6 4z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 8h6M9 12h6" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  navCart: ({ size = 24, color = '#9A9AA0' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 5h2.5l2 11h11l1.5-8H7" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="20" r="1.4" stroke={color} strokeWidth="1.6"/>
      <circle cx="17" cy="20" r="1.4" stroke={color} strokeWidth="1.6"/>
    </svg>
  ),
  navProfile: ({ size = 24, color = '#9A9AA0' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="3.5" stroke={color} strokeWidth="1.6"/>
      <path d="M5 20c1-4 4-6 7-6s6 2 7 6" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  chevronRight: ({ size = 16, color = '#5A5A62' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  phone: ({ size = 18, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M3 4c0 7 4 11 11 11l1.5-3-3.5-1.5-1.5 1.5C8 11 6.5 9.5 5.5 7l1.5-1.5L5.5 2 3 4z"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  message: ({ size = 18, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M3 4h12v9H7l-3 2v-2H3V4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  pin: ({ size = 22, color = '#E63946' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M11 2c-3.5 0-6 2.5-6 6 0 5 6 12 6 12s6-7 6-12c0-3.5-2.5-6-6-6z" fill={color}/>
      <circle cx="11" cy="8" r="2" fill="#fff"/>
    </svg>
  ),
  edit: ({ size = 14, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 10l1-3 6-6 2 2-6 6-3 1zM8 3l2 2" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

window.FPIcons = FPIcons;
