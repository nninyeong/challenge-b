export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          division: string | null;
          invitation_id: string;
          name: string | null;
          person_count: number | null;
          whether_food: boolean | null;
        };
        Insert: {
          division?: string | null;
          invitation_id?: string;
          name?: string | null;
          person_count?: number | null;
          whether_food?: boolean | null;
        };
        Update: {
          division?: string | null;
          invitation_id?: string;
          name?: string | null;
          person_count?: number | null;
          whether_food?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'attendance_invitation_id_fkey';
            columns: ['invitation_id'];
            isOneToOne: false;
            referencedRelation: 'invitation';
            referencedColumns: ['id'];
          },
        ];
      };
      guestbook: {
        Row: {
          content: string | null;
          created_at: string;
          guestbook_id: string;
          invitation_id: string;
          name: string | null;
          password: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          guestbook_id?: string;
          invitation_id?: string;
          name?: string | null;
          password?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          guestbook_id?: string;
          invitation_id?: string;
          name?: string | null;
          password?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'guestbook_invitation_id_fkey';
            columns: ['invitation_id'];
            isOneToOne: false;
            referencedRelation: 'invitation';
            referencedColumns: ['id'];
          },
        ];
      };
      invitation: {
        Row: {
          account: Json;
          attendance: Json;
          bg_color: Json;
          created_at: string;
          gallery: Json;
          greeting_message: Json;
          guestbook: Json;
          id: string;
          img_ratio: Json | null;
          main_text: Json;
          main_view: Json;
          mood: Json;
          personal_info: Json;
          stickers: Json | null;
          type: Json;
          user_id: string;
          wedding_info: Json;
          navigation_detail: Json | null;
          d_day: Json;
        };
        Insert: {
          account: Json;
          attendance: Json;
          bg_color?: Json;
          created_at?: string;
          gallery: Json;
          greeting_message?: Json;
          guestbook: Json;
          id?: string;
          img_ratio?: Json | null;
          main_text?: Json;
          main_view?: Json;
          mood?: Json;
          personal_info?: Json;
          stickers?: Json | null;
          type?: Json;
          user_id?: string;
          wedding_info?: Json;
          navigation_detail?: Json | null;
          d_day?: Json | null;
        };
        Update: {
          account?: Json;
          attendance?: Json;
          bg_color?: Json;
          created_at?: string;
          gallery?: Json;
          greeting_message?: Json;
          guestbook?: Json;
          id?: string;
          img_ratio?: Json | null;
          main_text?: Json;
          main_view?: Json;
          mood?: Json;
          personal_info?: Json;
          stickers?: Json | null;
          type?: Json;
          user_id?: string;
          wedding_info?: Json;
          navigation_detail?: Json | null;
          d_day?: Json | null;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          image_url: string[] | null;
          user_id: string;
          user_name: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          image_url?: string[] | null;
          user_id: string;
          user_name?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          image_url?: string[] | null;
          user_id?: string;
          user_name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
