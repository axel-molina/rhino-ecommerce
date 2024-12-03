import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const CardSendCart = () => {
  return (
    <div className="flex flex-col">
      <Card className="mt-8">
        <CardContent className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Total: $28.000,00
          </h1>
          <Button variant="default" className="w-full" size="lg">
            Enviar pedido
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
