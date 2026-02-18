import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, Check, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (error) {
        console.error("Failed to parse cookie preferences:", error);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    savePreferences(necessaryOnly);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
    setShowSettings(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie_consent", JSON.stringify(prefs));
    localStorage.setItem("cookie_consent_date", new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);

    // Apply preferences (enable/disable tracking scripts)
    if (prefs.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }

    if (prefs.marketing) {
      enableMarketing();
    } else {
      disableMarketing();
    }
  };

  const enableAnalytics = () => {
    // Enable Google Analytics if configured
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const disableAnalytics = () => {
    // Disable Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  const enableMarketing = () => {
    // Enable marketing cookies
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
  };

  const disableMarketing = () => {
    // Disable marketing cookies
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          >
            <div className="mx-auto max-w-7xl">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl">
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

                <div className="relative p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    {/* Icon and content */}
                    <div className="flex-1 flex gap-4">
                      <div className="hidden sm:flex shrink-0 h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                        <Cookie className="h-6 w-6 text-blue-500" />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                              <Cookie className="h-5 w-5 sm:hidden text-blue-500" />
                              We Value Your Privacy
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              We use cookies to enhance your browsing experience, serve
                              personalized content, and analyze our traffic. By clicking
                              &quot;Accept All&quot;, you consent to our use of cookies.
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <Link
                            href="/cookie-policy"
                            className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-foreground transition-colors"
                          >
                            <Shield className="h-3 w-3" />
                            Cookie Policy
                          </Link>
                          <span className="text-muted-foreground/50">•</span>
                          <Link
                            href="/privacy"
                            className="underline underline-offset-2 hover:text-foreground transition-colors"
                          >
                            Privacy Policy
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
                      <Button
                        variant="outline"
                        onClick={() => setShowSettings(true)}
                        className="w-full sm:w-auto gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Customize
                      </Button>
                      <Button
                        variant="outline"
                        onClick={acceptNecessary}
                        className="w-full sm:w-auto"
                      >
                        Necessary Only
                      </Button>
                      <Button
                        onClick={acceptAll}
                        className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Check className="h-4 w-4" />
                        Accept All
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Settings className="h-6 w-6 text-blue-500" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. You can enable or disable different types
              of cookies below. Note that blocking some types of cookies may impact your
              experience.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="space-y-3 rounded-lg border border-border p-4 bg-muted/30">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-500" />
                    <Label htmlFor="necessary" className="text-base font-semibold">
                      Strictly Necessary Cookies
                    </Label>
                    <span className="text-xs text-red-500 font-medium px-2 py-0.5 rounded-full bg-red-500/10">
                      Always Active
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies are essential for the website to function properly. They
                    enable basic functions like page navigation, secure areas, and form
                    submissions.
                  </p>
                </div>
                <Switch
                  id="necessary"
                  checked={preferences.necessary}
                  disabled
                  className="mt-1"
                />
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="space-y-3 rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-blue-500" />
                    <Label htmlFor="functional" className="text-base font-semibold cursor-pointer">
                      Functional Cookies
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies enable enhanced functionality and personalization, such
                    as remembering your preferences (e.g., language, theme).
                  </p>
                </div>
                <Switch
                  id="functional"
                  checked={preferences.functional}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, functional: checked })
                  }
                  className="mt-1"
                />
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-3 rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Cookie className="h-4 w-4 text-green-500" />
                    <Label htmlFor="analytics" className="text-base font-semibold cursor-pointer">
                      Analytics Cookies
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies help us understand how visitors interact with our
                    website by collecting and reporting information anonymously (Google
                    Analytics).
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, analytics: checked })
                  }
                  className="mt-1"
                />
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-3 rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Cookie className="h-4 w-4 text-purple-500" />
                    <Label htmlFor="marketing" className="text-base font-semibold cursor-pointer">
                      Marketing Cookies
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies are used to track visitors across websites to display
                    relevant advertisements and measure campaign effectiveness.
                  </p>
                </div>
                <Switch
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, marketing: checked })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={acceptNecessary}
              variant="outline"
              className="flex-1"
            >
              Necessary Only
            </Button>
            <Button
              onClick={saveCustomPreferences}
              className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Check className="h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}