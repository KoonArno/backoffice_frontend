'use client';

import { useState } from 'react';
import type { Question, QuestionType, ExamType, QuestionOption, ExamSettings, VideoQuestion, Lesson } from '../types';
import type { Video as VideoType } from '@/features/videos/types';
import { courseService } from '../services/courseService';

// Use Lesson type directly or extend if needed for form-specific temporary states
// But here we can mostly stick to the shared type
export type FormLesson = Lesson & {
    videoQuestions: VideoQuestion[]; // Enforce array even if empty
};

export interface NewLessonData {
    title: string;
    videoId: number | null;
    duration: string;
    description: string;
    videoQuestions: VideoQuestion[];
}

export function useCourseForm(courseId?: string) {
    // Videos uploaded for this course
    const [uploadedVideos, setUploadedVideos] = useState<VideoType[]>([]);

    // Lessons using the uploaded videos
    const [lessons, setLessons] = useState<FormLesson[]>([
        {
            id: '1',
            title: 'บทนำ: ภาพรวมของคอร์ส',
            duration: '05:30',
            description: 'แนะนำเนื้อหาที่จะได้เรียนในคอร์สนี้และวัตถุประสงค์การเรียนรู้',
            videoQuestions: [],
            videoId: null
        },
        {
            id: '2',
            title: 'พื้นฐานการดูแลผู้ป่วย',
            duration: '15:45',
            description: 'หลักการพื้นฐานในการดูแลผู้ป่วยโรคเรื้อรังที่บ้าน',
            videoQuestions: [],
            videoId: null
        }
    ]);

    const [courseType, setCourseType] = useState('paid');
    const [ceEnabled, setCeEnabled] = useState(false);

    // Lesson modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentLesson, setCurrentLesson] = useState<FormLesson | null>(null);
    const [newLesson, setNewLesson] = useState<NewLessonData>({
        title: '',
        videoId: null,
        duration: '',
        description: '',
        videoQuestions: [],
    });

    // Exam states (Final Exam)
    const [examQuestions, setExamQuestions] = useState<Question[]>([]);
    const [examSettings, setExamSettings] = useState<ExamSettings>({
        minPassingScore: 70,
        maxAttempts: 'unlimited',
    });
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
    const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

    // Video handlers
    const handleAddVideo = (video: VideoType) => {
        setUploadedVideos([...uploadedVideos, video]);
    };

    const handleDeleteVideo = (videoId: number) => {
        // Check if video is being used by any lesson
        const isUsed = lessons.some(l => l.videoId === videoId);
        if (isUsed) {
            alert('ไม่สามารถลบวิดีโอนี้ได้ เนื่องจากกำลังถูกใช้งานในบทเรียน');
            return;
        }
        setUploadedVideos(uploadedVideos.filter(v => v.id !== videoId));
        if (previewVideoId === videoId) {
            setPreviewVideoId(null);
        }
    };

    // Preview Video
    const [previewVideoId, setPreviewVideoId] = useState<number | null>(null);

    const handleSetPreviewVideo = (videoId: number) => {
        setPreviewVideoId(videoId === previewVideoId ? null : videoId);
    };

    // Lesson handlers
    const handleAddLesson = (lessonData: NewLessonData) => {
        const lesson: FormLesson = {
            id: Date.now().toString(),
            title: lessonData.title,
            videoId: lessonData.videoId,
            duration: lessonData.duration,
            description: lessonData.description,
            videoQuestions: lessonData.videoQuestions || [],
        };
        setLessons([...lessons, lesson]);
        setNewLesson({ title: '', videoId: null, duration: '', description: '', videoQuestions: [] });
        setShowAddModal(false);
    };

    const handleEditLesson = () => {
        if (currentLesson) {
            setLessons(lessons.map((l) => (l.id === currentLesson.id ? currentLesson : l)));
            setShowEditModal(false);
            setCurrentLesson(null);
        }
    };

    const handleDeleteLesson = () => {
        if (currentLesson) {
            setLessons(lessons.filter((l) => l.id !== currentLesson.id));
            setShowDeleteModal(false);
            setCurrentLesson(null);
        }
    };

    const openEditModal = (lesson: FormLesson) => {
        setCurrentLesson(lesson);
        setShowEditModal(true);
    };

    const openDeleteModal = (lesson: FormLesson) => {
        setCurrentLesson(lesson);
        setShowDeleteModal(true);
    };

    // Question handlers (Final Exam)
    const handleAddExamQuestion = (questionData: {
        type: QuestionType;
        examType: ExamType;
        question: string;
        options?: QuestionOption[];
        correctAnswer?: string;
        timestamp?: string;
        points?: number;
    }) => {
        const question: Question = {
            id: Date.now().toString(),
            ...questionData,
        };
        setExamQuestions([...examQuestions, question]);
        setShowAddQuestionModal(false);
    };

    const handleEditExamQuestion = () => {
        if (currentQuestion) {
            setExamQuestions(examQuestions.map((q) => (q.id === currentQuestion.id ? currentQuestion : q)));
            setShowEditQuestionModal(false);
            setCurrentQuestion(null);
        }
    };

    const handleDeleteExamQuestion = () => {
        if (currentQuestion) {
            setExamQuestions(examQuestions.filter((q) => q.id !== currentQuestion.id));
            setShowDeleteQuestionModal(false);
            setCurrentQuestion(null);
        }
    };

    const openEditQuestionModal = (question: Question) => {
        setCurrentQuestion(question);
        setShowEditQuestionModal(true);
    };

    const openDeleteQuestionModal = (question: Question) => {
        setCurrentQuestion(question);
        setShowDeleteQuestionModal(true);
    };

    // Basic Course Info State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState(''); // รายละเอียดคอร์ส
    const [categoryId, setCategoryId] = useState<string>('1');
    const [subcategories, setSubcategories] = useState<string[]>([]);

    // Load initial data if editing
    // useEffect(() => { if(courseId) { ... load course ... } }, [courseId]);

    const saveCourse = async () => {
        if (!courseId) return;

        const payload = {
            title,
            description,
            details, // Added details
            categoryId,
            subcategories,
            lessons,
            videos: uploadedVideos,
            previewVideoId,
            exams: [{
                title: 'Final Exam',
                questions: examQuestions,
                ...examSettings
            }],
            settings: {
                type: courseType,
                ceEnabled,
                status: 'published' // TODO: Add status state
            }
        };

        return courseService.updateCourse(courseId, payload);
    };

    return {
        // Basic Info
        title, setTitle,
        description, setDescription,
        details, setDetails,
        categoryId, setCategoryId,
        subcategories, setSubcategories,

        // Actions
        saveCourse,

        // Videos
        uploadedVideos,
        handleAddVideo,
        handleDeleteVideo,

        // Lessons
        lessons,
        newLesson,
        currentLesson,
        setNewLesson,
        setCurrentLesson,

        // Course settings
        courseType,
        setCourseType,
        ceEnabled,
        setCeEnabled,

        // Lesson modals
        showAddModal,
        setShowAddModal,
        showEditModal,
        setShowEditModal,
        showDeleteModal,
        setShowDeleteModal,

        // Lesson handlers
        handleAddLesson,
        handleEditLesson,
        handleDeleteLesson,
        openEditModal,
        openDeleteModal,

        // Questions (Final Exam)
        questions: examQuestions, // Export as questions for compatibility or rename in consumer
        examQuestions,
        currentQuestion,
        examSettings,
        setExamSettings,

        // Question modals
        showAddQuestionModal,
        setShowAddQuestionModal,
        showEditQuestionModal,
        setShowEditQuestionModal,
        showDeleteQuestionModal,
        setShowDeleteQuestionModal,

        // Question handlers
        handleAddQuestion: handleAddExamQuestion,
        handleEditQuestion: handleEditExamQuestion,
        handleDeleteQuestion: handleDeleteExamQuestion,
        openDeleteQuestionModal,

        // Preview Video
        previewVideoId,
        handleSetPreviewVideo,
    };
}
