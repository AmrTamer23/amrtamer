import { Button } from "../ui/button";

export function HomeActions() {
    return (
        <div className="flex flex-1 w-full justify-end gap-4">
            <Button asChild size="lg" variant="ghost">
                <a href="/projects" aria-label="View projects"> View Projects </a>
            </Button>
            <Button asChild size="lg" variant="default">
                <a
                    href="https://links.amrtamer.dev/cv"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Amr Tamer's resume (opens in new tab)"
                >
                    Resumé
                </a>
            </Button>
        </div>
    );
}