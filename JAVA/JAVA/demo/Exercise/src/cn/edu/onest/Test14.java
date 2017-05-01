package cn.edu.onest;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Test14 {
	public static void main(String[] args) {
		List<Student> studentList = new ArrayList<Student>();
		studentList.add(new Student("Tom", 78));
		studentList.add(new Student("Lucy", 58));
		studentList.add(new Student("Jim", 88));
		studentList.add(new Student("John", 98));

		System.out.println(studentList.toString());

		/*
		 * //������������ѧ���ĳɼ� Iterator<Student> studentIt = studentList.iterator();
		 * while(studentIt.hasNext()){ Student student = studentIt.next();
		 * //�ж������Ƿ����Ҫ�� if(student.getName().contains("J")){
		 * System.out.println(student.toString()); } }
		 */
		searchByName(studentList, "J");
		searchFailure(studentList);
	}

	public static void searchByName(List list, String name) {
		// ������������ѧ���ĳɼ�
		Iterator<Student> studentIt = list.iterator();
		while (studentIt.hasNext()) {
			Student student = studentIt.next();
			// �ж������Ƿ����Ҫ��
			if (student.getName().contains(name)) {
				System.out.println(student.toString());
			}
		}
	}


	public static void searchFailure(List list) {
		int num = 0;
		// ���Ҳ���������
		Iterator<Student> studentIt = list.iterator();
		while (studentIt.hasNext()) {
			Student student = studentIt.next();
			// �ж��ɼ��Ƿ񲻼���
			if (student.getScore() < 60) {
				System.out.println(student.toString());
				num++;
			}
		}
		System.out.println("������������" + num);
	}
}
