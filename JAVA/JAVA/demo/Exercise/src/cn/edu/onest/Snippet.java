package cn.edu.onest;

import java.util.Iterator;
import java.util.List;

public class Snippet {
	
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
}

