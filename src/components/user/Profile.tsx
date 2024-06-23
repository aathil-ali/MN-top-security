import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Link } from 'lucide-react';
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Profile = ({ user }) => {
  return (
    <section className="w-full">
      <div className="container grid grid-cols-1 gap-8 py-8">
        <div className="col-span-1 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
            <AvatarImage alt={`@${user.name}`} src={user.avatar} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" defaultValue="John Doe" id="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" defaultValue={user.email} id="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                className="min-h-[100px]"
                defaultValue="I am a web developer with a passion for building beautiful and functional websites."
                id="bio"
              />
            </div>
            <Button>Update</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
