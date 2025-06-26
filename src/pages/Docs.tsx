import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  FileText,
  Search,
  Pin,
  Tag,
  Calendar,
  Link,
  BookOpen,
  Notebook,
  Users,
  Clock,
} from "lucide-react";
import { Note } from "@/types";

// Mock notes data
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Project Planning Notes",
    content: `# Project Planning Session

## Key Decisions
- Use Next.js for the frontend
- Implement real-time collaboration
- Focus on mobile-first design

## Action Items
- [ ] Set up development environment
- [ ] Create wireframes
- [ ] Research real-time solutions
- [x] Define project scope

## Resources
- [Next.js Documentation](https://nextjs.org)
- [Figma Design Files](https://figma.com)`,
    category: "projects",
    tags: ["planning", "nextjs", "collaboration"],
    linkedTaskIds: ["1", "2"],
    linkedEventIds: [],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-14"),
    isPinned: true,
  },
  {
    id: "2",
    title: "Daily Journal - January 15",
    content: `# Today's Reflection

## What I Accomplished
- Completed 4 pomodoro sessions
- Finished the authentication module
- Had a productive client meeting

## Challenges
- API integration took longer than expected
- Need to improve time estimation

## Tomorrow's Focus
- Fix the remaining bugs
- Start on the dashboard design
- Schedule team retrospective`,
    category: "journal",
    tags: ["daily", "reflection"],
    linkedTaskIds: [],
    linkedEventIds: ["3"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    isPinned: false,
  },
  {
    id: "3",
    title: "Meeting: Q1 Strategy",
    content: `# Q1 Strategy Meeting

**Date:** January 12, 2024  
**Attendees:** Team leads, Product Manager  

## Key Topics
1. Revenue targets for Q1
2. Product roadmap priorities
3. Resource allocation

## Decisions Made
- Focus on core features first
- Hire 2 additional developers
- Launch beta in March

## Next Steps
- Draft detailed project timeline
- Begin recruitment process
- Schedule follow-up in 2 weeks`,
    category: "meetings",
    tags: ["strategy", "q1", "planning"],
    linkedTaskIds: ["1"],
    linkedEventIds: ["1"],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    isPinned: false,
  },
];

const categories = [
  { id: "all", name: "All Notes", icon: FileText },
  { id: "projects", name: "Projects", icon: BookOpen },
  { id: "journal", name: "Journal", icon: Notebook },
  { id: "meetings", name: "Meetings", icon: Users },
  { id: "templates", name: "Templates", icon: FileText },
];

function NoteCard({
  note,
  onSelect,
}: {
  note: Note;
  onSelect: (note: Note) => void;
}) {
  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-soft-lg hover:scale-105"
      onClick={() => onSelect(note)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {note.isPinned && <Pin className="w-4 h-4 text-primary" />}
            <h3 className="font-semibold truncate">{note.title}</h3>
          </div>
          <Badge variant="secondary" className="text-xs">
            {note.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {note.content.replace(/[#*`]/g, "").substring(0, 150)}...
        </p>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {note.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{note.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{note.updatedAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            {note.linkedTaskIds.length > 0 && (
              <div className="flex items-center gap-1">
                <Link className="w-3 h-3" />
                <span>{note.linkedTaskIds.length} tasks</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NoteEditor({
  note,
  onSave,
  onClose,
}: {
  note: Note | null;
  onSave: (note: Partial<Note>) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState(note?.category || "projects");
  const [tags, setTags] = useState(note?.tags.join(", ") || "");

  const handleSave = () => {
    onSave({
      id: note?.id || Date.now().toString(),
      title,
      content,
      category,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      linkedTaskIds: note?.linkedTaskIds || [],
      linkedEventIds: note?.linkedEventIds || [],
      createdAt: note?.createdAt || new Date(),
      updatedAt: new Date(),
      isPinned: note?.isPinned || false,
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{note ? "Edit Note" : "New Note"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
          {/* Editor */}
          <div className="space-y-4 overflow-auto">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="tag1, tag2, tag3"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your note..."
                className="mt-1 min-h-[400px] font-mono"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={!title.trim()}>
                Save Note
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="border-l pl-6 overflow-auto">
            <h3 className="font-semibold mb-4">Preview</h3>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h1>{title || "Untitled Note"}</h1>
              <div className="whitespace-pre-wrap">
                {content || "Start typing to see preview..."}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Docs() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      selectedCategory === "all" || note.category === selectedCategory;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const handleSaveNote = (noteData: Partial<Note>) => {
    const existingIndex = notes.findIndex((n) => n.id === noteData.id);
    if (existingIndex >= 0) {
      const updatedNotes = [...notes];
      updatedNotes[existingIndex] = {
        ...notes[existingIndex],
        ...noteData,
      } as Note;
      setNotes(updatedNotes);
    } else {
      setNotes([noteData as Note, ...notes]);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Docs & Notes</h1>
            <p className="text-muted-foreground">
              Create, organize, and link your notes to tasks and calendar events
            </p>
          </div>
          <Button onClick={() => setShowEditor(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const count =
                    category.id === "all"
                      ? notes.length
                      : notes.filter((n) => n.category === category.id).length;

                  return (
                    <Button
                      key={category.id}
                      variant={
                        selectedCategory === category.id ? "secondary" : "ghost"
                      }
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.name}
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {count}
                      </Badge>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Daily Journal
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Meeting Notes
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Project Plan
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Notes Grid */}
          <div className="lg:col-span-3">
            {filteredNotes.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notes found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? "Try adjusting your search terms"
                      : "Create your first note to get started"}
                  </p>
                  <Button onClick={() => setShowEditor(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Note
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onSelect={(note) => {
                      setSelectedNote(note);
                      setShowEditor(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Note Editor */}
        {showEditor && (
          <NoteEditor
            note={selectedNote}
            onSave={handleSaveNote}
            onClose={() => {
              setShowEditor(false);
              setSelectedNote(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
}
