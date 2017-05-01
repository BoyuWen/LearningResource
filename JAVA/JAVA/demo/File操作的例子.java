package com.edu2act.www;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.io.Writer;
import java.util.List;

import com.edu2act.www.enty.Student;

public class Main {
	public static final String FILEPATH = "C://Demo//test.txt";

	public static void saveData(List<Student> ls) {
		File f = new File(FILEPATH);
		File fdir = new File(f.getParent());    //获取父级目录

		if (!fdir.exists()) {
			fdir.mkdir();
		}

		if (f.exists()) {
			// System.out.println("the file is exist!");
		} else {
			try {
				f.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();   //打印并向上抛出异常
				System.out.println("the file creat faile!");
			}
		}

		try {
			Writer w = new FileWriter(f);

			for (int i = 0; i < ls.size(); i++) {
				w.write(ls.get(i).getNo() + "\t" + ls.get(i).getName() + "\t" + ls.get(i).getScore() + "\n");
			}

			w.close();
			System.out.println("write finish!");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static List<Student> readData() {
		File f = new File(FILEPATH);

		if (f.exists()) {
			try {
				Reader r = new FileReader(f);
				char[] cbuf = new char[255];
				r.read(cbuf);
				r.close();

				String stmp = new String(cbuf);

				String[] stus = stmp.split("\n");
				for (int i = 0; i < stus.length; i++) {
					System.out.println("student" + i);
					String[] s = stus[i].split("\t");
					System.out.println(s[0]);
					System.out.println(s[1]);
					System.out.println(s[2]);
				}

			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else {
			System.out.println("file is not exist!");
		}
		return null;
	}

	public static void allFileList(String path) {
		File f = new File(path);
		String[] flst = f.list();
		for (int i = 0; i < flst.length; i++) {
			System.out.println(path + "\\" + flst[i]);
			File tempf = new File(path + flst[i]);
			if (tempf.isDirectory()) {
				allFileList(tempf.getPath());
			}
		}
	}

	public static void main(String[] args) {
		File infile = new File("C://Demo//baidu.png");
		File outfile = new File("C://Demo//bak.png");
		try {
			InputStream is = new FileInputStream(infile);
			OutputStream out = new FileOutputStream(outfile);
			
			int b = 0;
			byte bs[] = new byte[1024];
			while (true) {
				b = is.read(bs);
				out.write(bs, 0, b);
				System.out.println(b);
				if (b != 1024) {
					break;
				}
			}
			is.close();
			out.close();
			System.out.println("it is finish!");
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

		

		// List<Record> l = new ArrayList<Record>();
		//
		// l.add(new Record("zhangsan", 100));
		// l.add(new Record("lisi", 200));
		// l.add(new Record("wangwu", 500));
		// l.add(new Record("zhangsan", 300));
		// l.add(new Record("wangwu", 400));
		// l.add(new Record("zhaoliu", 600));
		//
		// Iterator<Record> iter = l.iterator();  //迭代器
		// while (iter.hasNext()) {           △△△△△△△△△△△△△△△△
		// System.out.println(iter.next().toString());
		// }
		//
		// for (int i = 0; i < l.size(); i++) {
		// System.out.println(l.get(i).toString());
		// }
		//
		// Map<String, Integer> map = new HashMap<>();
		// for (int i = 0; i < l.size(); i++) {
		// String key = ((Record) l.get(i)).getName();
		// if (map.containsKey(key)) {
		// map.put(key, map.get(key) + 1);
		// } else {
		// map.put(key, 1);
		// }
		// }
		
		
		
		
		//IteratorIteratorIteratorIteratorIteratorIteratorIteratorIteratorIteratorIteratorIterator
		// for (String key : map.keySet()) {   ？？？？？？？这时候使用keySet()方法获取所有的key值，
		// System.out.println("key = " + key + ",value = " + map.get(key));
		// }

		// LinkedHashSet ll = new LinkedHashSet<>();
		// ll.add("zhangsan");
		// ll.add("lisi");
		// ll.add("wangwu");
		// ll.add("zhaoliu");
		// ll.add("andy");
		// ll.add("tom");
		// System.out.println("LinkedHashSet:"+ll);

		// TreeSet ts = new TreeSet<>();
		// ts.add("zhangsan");
		// ts.add("lisi");
		// ts.add("wangwu");
		// ts.add("zhaoliu");
		// ts.add("andy");
		// ts.add("tom");
		// System.out.println("TreeSet:"+ts);
		//
		// HashSet set = new HashSet<>();
		// set.add("zhangsan");
		// set.add("lisi");
		// set.add("wangwu");
		// set.add("zhaoliu");
		// set.add("andy");
		// set.add("tom");
		// System.out.println("HashSet:"+set);
	}
}