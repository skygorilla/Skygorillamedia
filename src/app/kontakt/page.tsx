import { ContactForm } from '@/components/ui/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Kontakt - Glas Otoka',
  description: 'Kontaktirajte nas za više informacija o našim uslugama'
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Kontaktirajte nas</h1>
            <p className="text-muted-foreground text-lg">
              Imate pitanja? Rado ćemo vam pomoći.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Pošaljite nam poruku</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Kontakt informacije</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">info@glasotoka.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Telefon</h3>
                    <p className="text-muted-foreground">+385 20 123 456</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Adresa</h3>
                    <p className="text-muted-foreground">
                      Korčula, Hrvatska<br />
                      20260 Korčula
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Radno vrijeme</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Ponedjeljak - Petak: 9:00 - 17:00</p>
                  <p>Subota: 9:00 - 13:00</p>
                  <p>Nedjelja: Zatvoreno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}