import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store";
import { useProfile } from "@/hooks/useAuth";
import { Calendar, IdCard, Mail, Phone, User } from "lucide-react";
import {
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const ProfilePage = () => {
  const { role, id } = useAuthStore();
  const { data } = useProfile(id as string);
  console.log(data);

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4 space-x-4">
            <User className="w-10 h-10 text-primary" />
            <div>
              <p className="text-xl font-semibold">{`${data?.name} ${data?.lastname}`}</p>
              {/* <p className="text-sm text-muted-foreground">
                  ID: {profile?.id}
                </p> */}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{data?.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{data?.phone || "N/A"}</span>
            </div>
            {/* <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>Age: {data?.age}</span>
            </div> */}
            <div className="flex items-center">
              <IdCard className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{data?.dni}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Username</TableCell>
                <TableCell>{data?.username}</TableCell>
              </TableRow>
              {/* <TableRow>
                  <TableCell className="font-medium">DNI</TableCell>
                  <TableCell>{data?.dni}</TableCell>
                </TableRow> */}
              <TableRow>
                <TableCell className="font-medium">Role</TableCell>
                <TableCell>{data?.role}</TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell className="font-medium">Area</TableCell>
                <TableCell>{data?.area?.name}</TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <Badge variant={data?.status ? "default" : "destructive"}>
                    {data?.status ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
