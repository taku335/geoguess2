export {};

declare global {
  interface Window {
    GOOGLE_MAPS_API_KEY?: string;
    PhotoSphereViewer?: {
      Viewer: {
        new (...args: any[]): any;
      };
    };
    google?: any;
  }

  const google: any;
  const PhotoSphereViewer: any;
  const L: any;
}
