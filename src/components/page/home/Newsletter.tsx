import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

export function Newsletter() {
  return (
    <section className="container mx-auto px-4 py-16">
      <Card className="bg-accent">
        <CardContent className="p-8">
          <div className="mx-auto max-w-2xl text-center">
            <CardTitle className="mb-4 text-3xl">Stay Updated</CardTitle>
            <CardDescription className="mb-6 text-lg">
              Subscribe to our newsletter for exclusive deals and updates
            </CardDescription>
            <form className="mx-auto flex max-w-md gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-input bg-background px-4 py-2"
              />
              <Button>Subscribe</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
