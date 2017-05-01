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
		 * //根据姓名查找学生的成绩 Iterator<Student> studentIt = studentList.iterator();
		 * while(studentIt.hasNext()){ Student student = studentIt.next();
		 * //判定名字是否符合要求 if(student.getName().contains("J")){
		 * System.out.println(student.toString()); } }
		 */
		searchByName(studentList, "J");
		searchFailure(studentList);
	}

	public static void searchByName(List list, String name) {
		// 根据姓名查找学生的成绩
		Iterator<Student> studentIt = list.iterator();
		while (studentIt.hasNext()) {
			Student student = studentIt.next();
			// 判定名字是否符合要求
			if (student.getName().contains(name)) {
				System.out.println(student.toString());
			}
		}
	}


	public static void searchFailure(List list) {
		int num = 0;
		// 查找不及格名单
		Iterator<Student> studentIt = list.iterator();
		while (studentIt.hasNext()) {
			Student student = studentIt.next();
			// 判定成绩是否不及格
			if (student.getScore() < 60) {
				System.out.println(student.toString());
				num++;
			}
		}
		System.out.println("不及格人数：" + num);
	}
}
