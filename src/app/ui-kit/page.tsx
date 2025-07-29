"use client"

import Head from "next/head"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CodeBlock } from "@/components/ui/code-block";
import { toast } from "sonner";

export default function UIkitPage() {
  return (

    <>
      <Head>
          <title>UI Kit - Components Preview</title>
        </Head>

      <main className="p-8 space-y-10 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-8">UI Kit - Components Preview</h1>

        <section>
          <h2 className="text-xl font-semibold mb-4">Typography</h2>
          <div className="space-y-4 max-w-md">
            <p>Default (Roboto)</p>
            <p className="font-inter">Inter</p>
            <CodeBlock code={`<p className="font-inter">Inter</p>`} />
            <p className="font-roboto">Roboto</p>
            <p className="font-amatic-sc text-xl font-bold">Amatic</p>
            <label className="tracking-wide">Test bold</label>
            <br/>
            <label className="font-semibold font-stretch-semi-expanded">Semi-expanded</label>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Inputs</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="input-default">Default Input</Label>
              <Input id="input-default" placeholder="Type here…" />
            </div>
            <div>
              <Label htmlFor="input-disabled">Disabled Input</Label>
              <Input id="input-disabled" placeholder="Can't type here…" disabled />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <div className="space-y-6 max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                  Card Description
                </CardDescription>
                <CardAction>
                  <Button variant="link">Card Action</Button>
                </CardAction>
              </CardHeader>
              <CardContent>This is the card content.</CardContent>
              <CardFooter>Card Footer</CardFooter>
            </Card>
            <Card>
              <CardContent>Card without header/footer</CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Toasts</h2>
          <div className="space-y-4 max-w-md">
            <Button
              onClick={() => toast.success("Yeah! 🎉")}
            >
              Porter un toast
            </Button>
             
            <Button variant="destructive"
              onClick={() => toast.error("Fail.. 😭")}
            >
              Porter un toast
            </Button>
            
          </div>
        </section>
      </main>
    </>
  );
}