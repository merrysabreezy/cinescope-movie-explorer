import { Film } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" />
              <span className="font-display font-bold cinema-gradient-text">CineScope</span>
            </div>
            {/* <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p> */}
          </div>

          {/* TMDB Attribution */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {/* {t("footer.poweredBy")} */}
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB Logo"
                className="h-4"
              />
            </a>
            <p className="text-xs text-muted-foreground/70 text-center md:text-right max-w-md">
              {/* {t("footer.disclaimer")} */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
