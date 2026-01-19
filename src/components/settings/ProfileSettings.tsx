import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, Building, Mail, Save, CheckCircle } from 'lucide-react'

const INDUSTRIES = [
  'Consulting', 'Coaching', 'Online Courses', 'Agency', 'SaaS', 'E-commerce', 'Health & Fitness', 'Finance', 'Real Estate', 'Other'
]

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    fullName: 'Demo User',
    email: 'demo@adpilot.com',
    companyName: 'My Business',
    industry: 'Consulting',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#7C3AED' }}>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
          <CardDescription className="text-white/80">
            Manage your account information
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                style={{ border: '2px solid black' }}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                style={{ border: '2px solid black' }}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company Name
              </Label>
              <Input
                value={profile.companyName}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                style={{ border: '2px solid black' }}
              />
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={profile.industry} onValueChange={(v) => setProfile({ ...profile, industry: v })}>
                <SelectTrigger style={{ border: '2px solid black' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full"
            style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: saved ? '#22C55E' : '#7C3AED', color: 'white' }}
          >
            {saved ? <><CheckCircle className="mr-2 h-4 w-4" />Saved!</> : <><Save className="mr-2 h-4 w-4" />Save Changes</>}
          </Button>
        </CardContent>
      </Card>

      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black' }}>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3" style={{ border: '2px solid black' }}>
            <div>
              <p className="font-bold">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive weekly performance summaries</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5" />
          </div>
          <div className="flex items-center justify-between p-3" style={{ border: '2px solid black' }}>
            <div>
              <p className="font-bold">Budget Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when campaigns hit budget limits</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5" />
          </div>
          <div className="flex items-center justify-between p-3" style={{ border: '2px solid black' }}>
            <div>
              <p className="font-bold">Performance Alerts</p>
              <p className="text-sm text-muted-foreground">Alert when metrics drop below benchmarks</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
