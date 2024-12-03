import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const CardResumeCart = () => {
    return (
        <Card className="mt-2">
            <CardContent className="p-2 flex items-center justify-between">
              <Image
                src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60"
                alt="Product"
                className="object-cover aspect-square rounded-xl overflow-hidden bg-gray-100 mr-2"
                width={60}
                height={60}
              />
              <div className="mh-2">
                <p>Remera overzise Marron Rhino Legacy</p>
                <div className="flex justify-between">
                  <p>Cantidad: 2</p>
                  <b>$28.000,00</b>
                </div>
              </div>
              <Button variant="default" size="sm">
                Eliminar
              </Button>
            </CardContent>
          </Card>
    )
}