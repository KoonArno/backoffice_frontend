import type { Category } from '../types/categories';

export const categoryService = {
    async getCategories(): Promise<Category[]> {
        // Mock data - วิทยาลัยต่างๆ ของสภาเภสัชกรรม
        return [
            {
                id: '1',
                name: 'วิทยาลัยเภสัชบำบัด',
                description: 'คอร์สเกี่ยวกับการบำบัดทางเภสัชกรรมและการดูแลผู้ป่วย',
                color: 'violet',
                subcategories: [
                    { id: '1-1', name: 'โรคเรื้อรัง', description: 'การดูแลผู้ป่วยโรคเรื้อรัง' },
                    { id: '1-2', name: 'ผู้สูงอายุ', description: 'การดูแลผู้สูงอายุ' },
                    { id: '1-3', name: 'ยาปฏิชีวนะ', description: 'การใช้ยาปฏิชีวนะ' },
                ],
                courseCount: 12,
            },
            {
                id: '2',
                name: 'วิทยาลัยคุ้มครองผู้บริโภคด้านยาฯ',
                description: 'คอร์สเกี่ยวกับการคุ้มครองผู้บริโภคและกฎหมายยา',
                color: 'blue',
                subcategories: [
                    { id: '2-1', name: 'กฎหมายยา', description: 'กฎหมายเกี่ยวกับยา' },
                    { id: '2-2', name: 'การคุ้มครองผู้บริโภค', description: 'หลักการคุ้มครองผู้บริโภค' },
                ],
                courseCount: 8,
            },
            {
                id: '3',
                name: 'วิทยาลัยเภสัชกรรมสมุนไพร',
                description: 'คอร์สเกี่ยวกับสมุนไพรและการแพทย์ทางเลือก',
                color: 'emerald',
                subcategories: [
                    { id: '3-1', name: 'สมุนไพรไทย', description: 'สมุนไพรไทยพื้นบ้าน' },
                    { id: '3-2', name: 'ผลิตภัณฑ์สมุนไพร', description: 'การพัฒนาผลิตภัณฑ์สมุนไพร' },
                ],
                courseCount: 10,
            },
            {
                id: '4',
                name: 'วิทยาลัยเภสัชกรรมอุตสาหการ',
                description: 'คอร์สเกี่ยวกับอุตสาหกรรมยาและการผลิตยา',
                color: 'amber',
                subcategories: [
                    { id: '4-1', name: 'การผลิตยา', description: 'กระบวนการผลิตยา' },
                    { id: '4-2', name: 'ควบคุมคุณภาพ', description: 'การควบคุมคุณภาพยา' },
                    { id: '4-3', name: 'GMP', description: 'มาตรฐาน GMP' },
                ],
                courseCount: 15,
            },
            {
                id: '5',
                name: 'วิทยาลัยเภสัชกรรมชุมชน',
                description: 'คอร์สเกี่ยวกับบริการเภสัชกรรมในชุมชนและร้านยา',
                color: 'rose',
                subcategories: [
                    { id: '5-1', name: 'การให้คำปรึกษา', description: 'ทักษะการให้คำปรึกษา' },
                    { id: '5-2', name: 'สุขภาพชุมชน', description: 'การดูแลสุขภาพชุมชน' },
                    { id: '5-3', name: 'บริหารร้านยา', description: 'การบริหารจัดการร้านยา' },
                ],
                courseCount: 18,
            },
            {
                id: '6',
                name: 'วิทยาลัยการบริหารเภสัชกิจ',
                description: 'คอร์สเกี่ยวกับการบริหารจัดการทางเภสัชกรรม',
                color: 'cyan',
                subcategories: [
                    { id: '6-1', name: 'การบริหารจัดการ', description: 'การบริหารองค์กร' },
                    { id: '6-2', name: 'การเงินเภสัชกรรม', description: 'การจัดการด้านการเงิน' },
                ],
                courseCount: 7,
            },
            {
                id: '7',
                name: 'วิทยาลัยเภสัชพันธุศาสตร์และเภสัชกรรมแม่นยำ',
                description: 'คอร์สเกี่ยวกับเภสัชพันธุศาสตร์และเภสัชกรรมแม่นยำ',
                color: 'pink',
                subcategories: [
                    { id: '7-1', name: 'เภสัชพันธุศาสตร์', description: 'พันธุกรรมและการใช้ยา' },
                    { id: '7-2', name: 'เภสัชกรรมแม่นยำ', description: 'การใช้ยาแบบแม่นยำ' },
                ],
                courseCount: 5,
            },
            {
                id: '8',
                name: 'อื่นๆ',
                description: 'คอร์สทั่วไปและหัวข้ออื่นๆ',
                color: 'slate',
                subcategories: [
                    { id: '8-1', name: 'ทั่วไป', description: 'หัวข้อทั่วไป' },
                ],
                courseCount: 6,
            },
        ];
    },

    async getCategoryById(id: string): Promise<Category | null> {
        const categories = await this.getCategories();
        return categories.find(cat => cat.id === id) || null;
    },
};
