import React, { useEffect } from 'react';
import ExtensionsNavbar from '../components/extensions/ExtensionsNavbar';
import ExtensionsHero from '../components/extensions/ExtensionsHero';
import ProblemSection from '../components/extensions/ProblemSection';
import EcosystemOverview from '../components/extensions/EcosystemOverview';
import ExtensionLibrary from '../components/extensions/ExtensionLibrary';
import DemoSection from '../components/extensions/DemoSection';
import EvidenceSection from '../components/extensions/EvidenceSection';
import UniquenessSection from '../components/extensions/UniquenessSection';
import PrivacySection from '../components/extensions/PrivacySection';
import CostSection from '../components/extensions/CostSection';
import EvidencePack from '../components/extensions/EvidencePack';
import FAQSection from '../components/extensions/FAQSection';
import ExtensionsFooter from '../components/extensions/ExtensionsFooter';

const ExtensionsLanding = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;

            const progressBar = document.getElementById('scroll-progress');
            if (progressBar) {
                progressBar.style.transform = `scaleX(${scroll})`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-primary selection:text-white">
            <ExtensionsNavbar />
            <main>
                <ExtensionsHero />
                <ProblemSection />
                <EcosystemOverview />
                <ExtensionLibrary />
                <DemoSection />
                <EvidenceSection />
                <UniquenessSection />
                <PrivacySection />
                <CostSection />
                <EvidencePack />
                <FAQSection />
            </main>
            <ExtensionsFooter />

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-white/10">
                <div className="h-full bg-primary origin-left transition-transform duration-100" style={{ transform: 'scaleX(0)', width: '100%' }} id="scroll-progress"></div>
            </div>
        </div>
    );
};

export default ExtensionsLanding;
