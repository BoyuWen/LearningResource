package cn.edu.onest;

import java.util.Iterator;
import java.util.List;

public class Snippet {
	
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
}

